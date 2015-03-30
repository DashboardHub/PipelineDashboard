<?php

namespace DashboardHub\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class ScrutinizerController
 * @package DashboardHub\Bundle\AppBundle\Controller
 */
class ScrutinizerController extends Controller
{
    /**
     * @param string $repository
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function qualityAction($repository)
    {
        return $this->render(
            'DashboardHubAppBundle:Scrutinizer:quality.html.twig',
            array(
                'build' => $this->get('dashboardhub_app_main.service.scrutinizer')
                                 ->getLatestBuild($repository)
            )
        );
    }

    /**
     * @param string $repository
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function coverageAction($repository)
    {
        return $this->render(
            'DashboardHubAppBundle:Scrutinizer:coverage.html.twig',
            array(
                'build' => $this->get('dashboardhub_app_main.service.scrutinizer')
                                 ->getLatestBuild($repository)
            )
        );
    }
}
