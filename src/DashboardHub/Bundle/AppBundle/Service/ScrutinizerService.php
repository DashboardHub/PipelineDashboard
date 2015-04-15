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
            try {
                $builds = json_decode(
                    $this->client
                        ->get('/api/repositories/g/' . $reponame)
                        ->getBody()
                        ->getContents()
                    ,
                    true
                );
            } catch (\Exception $e) {
                $builds = array(
                    'applications' => array(

                        'develop' => array(
                            'index' => array(
                                '_embedded' => array(
                                    'project' => array(
                                        'metric_values' => array(
                                            'scrutinizer.quality'       => 0,
                                            'scrutinizer.test_coverage' => 0
                                        )
                                    )
                                )
                            )

                        )
                    )
                );
            }
            $cache->set($builds, 600);
        }

        return $builds;
    }
}
