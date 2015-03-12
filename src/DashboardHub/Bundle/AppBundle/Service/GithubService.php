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
    private $client;
    /**
     * @var Cache
     */
    private $cache;

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
}
