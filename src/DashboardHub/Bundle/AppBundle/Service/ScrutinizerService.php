<?php
namespace DashboardHub\Bundle\AppBundle\Service;

use GuzzleHttp\Client;
use Tedivm\StashBundle\Service\CacheService as Cache;

/**
 * Class ScrutinizerService
 * @package Quickstart\Bundle\AppBundle\Service
 */
class ScrutinizerService
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
     * @return array
     */
    public function getBuilds($reponame)
    {
        $cache  = $this->cache->getItem(__METHOD__, $reponame);
        $builds = $cache->get();
        if ($cache->isMiss()) {
            $builds = json_decode(
                $this->client
                    ->get('/api/repositories/g/' . $reponame)
                    ->getBody()
                    ->getContents()
                ,
                true
            );
            $cache->set($builds, 600);
        }

        return $builds;
    }

    /**
     * @param string $reponame
     *
     * @return array
     */
    public function getLatestBuild($reponame)
    {
        $cache  = $this->cache->getItem(__METHOD__, $reponame);
        $build = $cache->get();
        if ($cache->isMiss()) {
            $build = array_slice($this->getBuilds($reponame)['applications'], 0, 1);

            $cache->set($build, 600);
        }

        return $build;
    }
}
