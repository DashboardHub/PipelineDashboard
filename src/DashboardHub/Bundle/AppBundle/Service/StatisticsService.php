<?php
namespace DashboardHub\Bundle\AppBundle\Service;

use Elasticsearch\Client;

/**
 * Class Dashboard
 * @package DashboardHub\Bundle\AppBundle\Service
 */
class StatisticsService
{
    /**
     * @var Client
     */
    protected $client;

    /**
     * @param Client $client
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function getStatistics()
    {
        $aggs = array(
            'aggs' => array(
                'public_views' => array(
                    'stats' => array(
                        'field' => 'dashboard.public_views'
                    )
                ),
                'requests' => array(
                    'stats' => array(
                        'field' => 'requests'
                    )
                ),
                'page_load_time' => array(
                    'stats' => array(
                        'field' => 'page_load_time'
                    )
                ),
                'page_size' => array(
                    'stats' => array(
                        'field' => 'page_size'
                    )
                ),
                'score' => array(
                    'stats' => array(
                        'field' => 'score'
                    )
                ),
            )
        );

        $search = array(
            'query' => array(
                'match_all' => array()
            ),
            'size'  => 0
        );

        $request = array(
            'index' => 'pages',
            'body'  => array_merge($search, $aggs)
        );

        return $this->client->search($request)['aggregations'];
    }
}
