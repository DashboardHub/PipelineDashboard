<?php

namespace Quickstart\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Tedivm\StashBundle\Service\CacheService as Cache;

/**
 * Class TravisController
 * @package Quickstart\Bundle\AppBundle\Controller
 */
class TravisController
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
    public function indexAction($reponame)
    {
        $travis = new \GuzzleHttp\Client();

        $cache  = $this->cache->getItem(__CLASS__ . __METHOD__, $reponame);
        $builds = $cache->get();

        if ($cache->isMiss()) {
            $builds = json_decode(
                $travis->get('https://api.travis-ci.org/repos/' . $reponame . '/builds')
                       ->getBody()->getContents()
                ,
                true
            );
            $cache->set($builds, 600);
        }

        return $this->templating->renderResponse(
            'QuickstartAppBundle:Travis:index.html.twig',
            array(
                'builds' => array_slice($builds, 0, 5)
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function durationGraphAction($reponame)
    {
        $travis = new \GuzzleHttp\Client();

        $cache  = $this->cache->getItem(__CLASS__ . __METHOD__, $reponame);
        $builds = $cache->get();

        if ($cache->isMiss()) {
            $builds = json_decode(
                $travis->get('https://api.travis-ci.org/repos/' . $reponame . '/builds')
                       ->getBody()->getContents()
                ,
                true
            );
            $cache->set($builds, 600);
        }

        $graph = array();
        foreach ($builds as $build) {
            $graph['x'][] = (int) $build['number'];
            $graph['y'][] = $build['duration'];
        }

        return $this->templating->renderResponse(
            'QuickstartAppBundle:Travis:durationgraph.html.twig',
            array(
                'builds' => $builds,
                'graph'  => array(
                    'x' => json_encode($graph['x']),
                    'y' => json_encode($graph['y'])
                )
            )
        );
    }
}
