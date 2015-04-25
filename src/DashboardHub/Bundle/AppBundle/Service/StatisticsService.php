<?php
namespace DashboardHub\Bundle\AppBundle\Service;

use Elasticsearch\Client as ElasticSearch;
use Guzzle\Service\Client as Guzzle;

/**
 * Class Dashboard
 * @package DashboardHub\Bundle\AppBundle\Service
 */
class StatisticsService
{
    /**
     * @var ElasticSearch
     */
    protected $elasticSearch;

    /**
     * @var Guzzle
     */
    protected $guzzle;

    /**
     * @param ElasticSearch $elasticSearch
     * @param Guzzle        $guzzle
     */
    public function __construct(ElasticSearch $elasticSearch, Guzzle $guzzle)
    {
        $this->elasticSearch = $elasticSearch;
        $this->guzzle        = $guzzle;
    }

    public function getYSlowStats()
    {
        return $this->guzzle
                ->execute(
                    $this->guzzle
                        ->getCommand('GetStatistics')
        );
    }

    public function getDashboardStats()
    {
        $aggs = array(
            'aggs' => array(
                'public_views' => array(
                    'stats' => array(
                        'field' => 'public_views'
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
            'index' => 'dashboard_dashboards',
            'body'  => array_merge($search, $aggs)
        );

        return $this->elasticSearch->search($request)['aggregations'];
    }
}
