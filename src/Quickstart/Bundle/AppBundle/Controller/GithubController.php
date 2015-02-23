<?php

namespace Quickstart\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Tedivm\StashBundle\Service\CacheService as Cache;

/**
 * Class GithubController
 * @package Quickstart\Bundle\AppBundle\Controller
 */
class GithubController
{

    /**
     * @var EngineInterface
     */
    private $templating;

    /**
     * @var Cache
     */
    private $cache;

    public function __construct(EngineInterface $templating, Cache $cache)
    {
        $this->templating = $templating;
        $this->cache      = $cache;
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function eventsAction($reponame)
    {
        $github = new \GuzzleHttp\Client();

        $cache  = $this->cache->getItem(__CLASS__ . __METHOD__, $reponame);
        $events = $cache->get();

        if ($cache->isMiss()) {
            $events = json_decode(
                $github->get('https://api.github.com/repos/' . $reponame . '/events?per_page=5')
                       ->getBody()->getContents(),
                true
            );
            $cache->set($events, 600);
        }

        return $this->templating->renderResponse(
            'QuickstartAppBundle:Github:events.html.twig',
            array(
                'events' => $events
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function pullrequestsAction($reponame)
    {
        $github = new \GuzzleHttp\Client();

        $cache        = $this->cache->getItem(__CLASS__ . __METHOD__, $reponame);
        $pullrequests = $cache->get();

        if ($cache->isMiss()) {
            $pullrequests = json_decode(
                $github->get('https://api.github.com/repos/' . $reponame . '/pulls?per_page=5')
                       ->getBody()->getContents()
                ,
                true
            );
            $cache->set($pullrequests, 600);
        }

        return $this->templating->renderResponse(
            'QuickstartAppBundle:Github:pullrequests.html.twig',
            array(
                'pullrequests' => $pullrequests
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function issuesAction($reponame)
    {
        $github = new \GuzzleHttp\Client();

        $cache  = $this->cache->getItem(__CLASS__ . __METHOD__, $reponame);
        $issues = $cache->get();

        if ($cache->isMiss()) {
            $issues = json_decode(
                $github->get('https://api.github.com/repos/' . $reponame . '/issues?per_page=5')
                       ->getBody()->getContents()
                ,
                true
            );
            $cache->set($issues, 600);
        }

        return $this->templating->renderResponse(
            'QuickstartAppBundle:Github:issues.html.twig',
            array(
                'issues' => $issues
            )
        );
    }
}
