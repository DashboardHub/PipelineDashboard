<?php

namespace Quickstart\Bundle\AppBundle\Service;

use GuzzleHttp\Client;
use Tedivm\StashBundle\Service\CacheService as Cache;

/**
 * Class Travis
 * @package Quickstart\Bundle\AppBundle\Service
 */
class Travis
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
        $this->cache      = $cache;
    }

    /**
     * @param string $reponame
     *
     * @return array
     */
    public function getBuilds($reponame)
    {
        $cache  = $this->cache->getItem(__CLASS__ . __METHOD__, $reponame);
        $builds = $cache->get();

        if ($cache->isMiss()) {
            $builds = json_decode(
                $this->client->get('https://api.travis-ci.org/repos/' . $reponame . '/builds')
                       ->getBody()->getContents()
                ,
                true
            );
            $cache->set($builds, 600);
        }

        return $builds;
    }
}
