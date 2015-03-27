<?php
namespace DashboardHub\Bundle\AppBundle\Service;

use GuzzleHttp\Client;
use Tedivm\StashBundle\Service\CacheService as Cache;

/**
 * Class Github
 * @package DashboardHub\Bundle\AppBundle\Service
 */
class GithubService
{
    /**
     * @var Client
     */
    protected $client;

    /**
     * @var Cache
     */
    protected $cache;

    /**
     * @param Client $client
     */
    public function __construct(Client $client, Cache $cache)
    {
        $this->client = $client;
        $this->cache  = $cache;
    }

    /**
     * @param string $reponame
     *
     * @return array $events
     */
    public function getEvents($reponame, $limit = 5)
    {
        $cache  = $this->cache->getItem(__METHOD__, $reponame, $limit);
        $events = $cache->get();
        if ($cache->isMiss()) {
            $events = json_decode(
                $this->client
                    ->get('/repos/' . $reponame . '/events?per_page=' . $limit)
                    ->getBody()
                    ->getContents(),
                true
            );
            $cache->set($events, 600);
        }

        return $events;
    }

    /**
     * @param string $reponame
     *
     * @return array $pullrequests
     */
    public function getPullRequests($reponame, $limit = 5)
    {
        $cache        = $this->cache->getItem(__METHOD__, $reponame, $limit);
        $pullrequests = $cache->get();
        if ($cache->isMiss()) {
            $pullrequests = json_decode(
                $this->client
                    ->get('/repos/' . $reponame . '/pulls?state=open&per_page=' . $limit)
                    ->getBody()
                    ->getContents()
                ,
                true
            );
            $cache->set($pullrequests, 600);
        }

        return $pullrequests;
    }

    /**
     * @param string $reponame
     *
     * @return array $issues
     */
    public function getIssues($reponame, $limit = 5)
    {
        $cache  = $this->cache->getItem(__METHOD__, $reponame, $limit);
        $issues = $cache->get();
        if ($cache->isMiss()) {
            $issues = json_decode(
                $this->client
                    ->get('/repos/' . $reponame . '/issues?state=open&per_page=' . $limit)
                    ->getBody()
                    ->getContents()
                ,
                true
            );
            $cache->set($issues, 600);
        }

        return $issues;
    }

    /**
     * @param string $reponame
     *
     * @return array $branches
     */
    public function getBranches($reponame, $limit = 5)
    {
        $cache    = $this->cache->getItem(__METHOD__, $reponame, $limit);
        $branches = $cache->get();
        if ($cache->isMiss()) {
            $branches = json_decode(
                $this->client
                    ->get('/repos/' . $reponame . '/branches?per_page=' . $limit)
                    ->getBody()
                    ->getContents()
                ,
                true
            );
            $cache->set($branches, 600);
        }

        return $branches;
    }

    /**
     * @param string $reponame
     * @param int    $limit
     *
     * @return array $branches
     */
    public function getMilestones($reponame, $limit = 5)
    {
        $cache      = $this->cache->getItem(__METHOD__, $reponame, $limit);
        $milestones = $cache->get();
        if ($cache->isMiss()) {
            $milestones = json_decode(
                $this->client
                    ->get('/repos/' . $reponame . '/milestones?per_page=' . $limit)
                    ->getBody()
                    ->getContents()
                ,
                true
            );

            // calculate Completeness percentage
            foreach ($milestones as $key => $milestone) {
                if ($milestone['closed_issues'] + $milestone['open_issues'] != 0) {
                    $milestones[ $key ]['completeness'] =
                        round(
                            (
                                $milestone['closed_issues'] /
                                ($milestone['closed_issues'] + $milestone['open_issues'])
                            ) * 100
                        );
                } else {
                    $milestones[ $key ]['completeness'] = 0;
                }
            }

            $cache->set($milestones, 600);
        }

        return $milestones;
    }

    /**
     * @param string $reponame
     *
     * @return array $contributors
     */
    public function getContributors($reponame)
    {
        $cache        = $this->cache->getItem(__METHOD__, $reponame);
        $contributors = $cache->get();
        if ($cache->isMiss() ) {
            $contributors = json_decode(
                $this->client
                    ->get('/repos/' . $reponame . '/stats/contributors')
                    ->getBody()
                    ->getContents()
                ,
                true
            );

            $cache->set($contributors, 60 * 60 * 24);
        }

        return $contributors;
    }

    /**
     * Get Top Contributors with Percentage for the last year
     *
     * @param string $reponame
     *
     * @return array $contributors
     */
    public function getTopContributors($reponame, $limit = 4)
    {
        $cache        = $this->cache->getItem(__METHOD__, $reponame, $limit);
        $contributors = $cache->get();
        if ($cache->isMiss()) {
            $contributors = array_slice(array_reverse($this->getContributors($reponame)), 0, $limit);

            $totalCommits = $this->getCommitTotal($reponame);
            foreach ($contributors as $key => $contributor) {
                $total = 0;
                $weeks = 0;
                foreach ($contributor['weeks'] as $week) {
                    if ($week['w'] > (new \Datetime())->sub(new \DateInterval('P1Y'))->getTimestamp()) {
                        $total += $week['c'];
                        $weeks++;
                    }
                }
                $contributors[ $key ]['weeks']      = $weeks;
                $contributors[ $key ]['percentage'] = round($total / $totalCommits * 100);
            }

            $cache->set($contributors, 60 * 60 * 24);
        }

        return $contributors;
    }

    /**
     * Commit activity over the last year
     *
     * @param string $reponame
     *
     * @return int $commits
     */
    public function getCommitTotal($reponame)
    {
        $cache   = $this->cache->getItem(__METHOD__, $reponame);
        $commits = $cache->get();
        if ($cache->isMiss()) {
            $commits = json_decode(
                $this->client
                    ->get('/repos/' . $reponame . '/stats/participation')
                    ->getBody()
                    ->getContents()
                ,
                true
            );

            $commits = array_sum($commits['all']);

            $cache->set($commits, 60 * 60 * 24);
        }

        return $commits;
    }
}
