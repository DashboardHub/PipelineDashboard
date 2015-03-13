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
            $cache->set($builds, 600);
        }

        return array_slice($builds, 0, $max);
    }
}
