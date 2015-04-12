<?php

namespace DashboardHub\Bundle\BeaconBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class PerformanceController extends Controller
{

    /**
     * @param Request $request
     * @param string  $uid
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(Request $request, $uid)
    {
        try {
            $dashboard = $this->get('dashboardhub_app_main.service.dashboard')
                              ->findOneByUidAndOwnedByUsernameOrIsPublic($uid);
        } catch (\InvalidArgumentException $e) {
            $request->getSession()
                    ->getFlashBag()
                    ->add(
                        'danger',
                        'Invalid Dashboard'
                    );

            return $this->redirect($this->generateUrl('dashboardhub_app_dashboard.list'));
        }


        // get pages for dashboard / uid (elastic search)
        $elasticsearch = $this->container->get('dashboardhub_app_main.elasticsearch.client');

        $aggs = array(
            'aggs' => array(
                'builds' => array(
                    'terms' => array(
                        'field' => 'build',
                    ),
                    'aggs'  => array(
                        'score'    => array(
                            'extended_stats' => array(
                                'field' => 'score'
                            )
                        ),
                        'requests' => array(
                            'extended_stats' => array(
                                'field' => 'requests'
                            )
                        ),
                        'pageload' => array(
                            'extended_stats' => array(
                                'field' => 'page_load_time'
                            )
                        ),
                        'pagesize' => array(
                            'extended_stats' => array(
                                'field' => 'page_size'
                            )
                        )
                    )
                )
            )
        );

        $search = array(
            'query' => array(
                'filtered' => array(
                    'query' => array(
                        'term' => array(
                            'dashboard.uid' => (string)$uid
                        )
                    )
                )
            ),
            'size'  => 100
        );

        $request = array(
            'index' => 'pages',
            'body'  => array_merge($search, $aggs)
        );

        $builds = $elasticsearch->search($request);

        return $this->render(
            'DashboardHubBeaconBundle:Performance:index.html.twig',
            array(
                'uid'    => $uid,
                'builds' => $builds
            )
        );
    }

    /**
     * @param Request $request
     * @param string  $uid
     * @param string  $build
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function buildAction(Request $request, $uid, $build)
    {
        try {
            $dashboard = $this->get('dashboardhub_app_main.service.dashboard')
                              ->findOneByUidAndOwnedByUsernameOrIsPublic($uid);
        } catch (\InvalidArgumentException $e) {
            $request->getSession()
                    ->getFlashBag()
                    ->add(
                        'danger',
                        'Invalid Dashboard'
                    );

            return $this->redirect($this->generateUrl('dashboardhub_app_dashboard.list'));
        }

        // get pages for dashboard / uid (elastic search)
        $elasticsearch = $this->container->get('dashboardhub_app_main.elasticsearch.client');

        $search = array(
            'query' => array(
                'filtered' => array(
                    'filter' => array(
                        'bool' => array(
                            'must' => array(
                                array(
                                    'term' => array(
                                        'dashboard.uid' => (string)$uid
                                    )
                                ),
                                array(
                                    'term' => array(
                                        'build' => $build
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            'sort' => array(
                'score' => array(
                    'order' => 'desc'
                )
            ),
            'size'  => 100
        );

        $request = array(
            'index' => 'pages',
            'body'  => $search
        );

        $pages = $elasticsearch->search($request);

        return $this->render(
            'DashboardHubBeaconBundle:Performance:build.html.twig',
            array(
                'uid'   => $uid,
                'build' => $build,
                'pages' => $pages
            )
        );
    }
}
