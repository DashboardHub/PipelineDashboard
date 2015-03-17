<?php
namespace DashboardHub\Bundle\AppBundle\Service;

use GuzzleHttp\Client;
use Tedivm\StashBundle\Service\CacheService as Cache;

/**
 * Class TravisService
 * @package Quickstart\Bundle\AppBundle\Service
 */
class TravisService
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
     * @param int    $max
     *
     * @return array
     */
    public function getBuilds($reponame, $max = 5)
    {
        $cache  = $this->cache->getItem(__METHOD__, $reponame, $max);
        $builds = $cache->get();
        if ($cache->isMiss()) {
            $builds = json_decode(
                $this->client
                    ->get('/repos/' . $reponame . '/builds')
                    ->getBody()
                    ->getContents()
                ,
                true
            );
            $cache->set($builds, 60);
        }

        return array_slice($builds, 0, $max);
    }

    /**
     * @param string $reponame
     * @param int    $max
     *
     * @return array
     */
    public function getBuildsDurationForGraph($reponame, $max = 20)
    {
        $builds = $this->getBuilds($reponame, $max);

        $graph = array();
        foreach ($builds as $build) {
            $graph['x'][] = (int)$build['number'];
            $graph['y'][] = $build['duration'];
        }

        $graph['series']['x'] = implode(',', $graph['x']);
        $graph['series']['y'] = implode(',', $graph['y']);
        $graph['min'] = min($graph['y']);
        $graph['max'] = max($graph['y']);
        $graph['diff'] = $graph['max'] - $graph['min'];

        return $graph;
    }
}
