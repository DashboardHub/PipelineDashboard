<?php

namespace DashboardHub\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class TravisController
 * @package DashboardHub\Bundle\AppBundle\Controller
 */
class TravisController extends Controller
{
    /**
     * @param string $repository
     * @param int    $limit
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function buildsAction($repository, $limit = 5)
    {
        return $this->render(
            'DashboardHubAppBundle:Travis:builds.html.twig',
            array(
                'builds'      => $this->get('dashboardhub_app_main.service.travis')
                                      ->getBuilds($repository, 5),
                'scrutinizer' => $this->get('dashboardhub_app_main.service.scrutinizer')
                                      ->getBuilds($repository),
            )
        );
    }

    /**
     * @param string $repository
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function latestBuildAction($repository)
    {
        return $this->render(
            'DashboardHubAppBundle:Travis:tile/latestBuild.html.twig',
            array(
                'build' => $this->get('dashboardhub_app_main.service.travis')
                                ->getBuilds($repository, 1)[0]
            )
        );
    }

    /**
     * @param string $repository
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function buildDurationAction($repository)
    {
        return $this->render(
            'DashboardHubAppBundle:Travis:tile/buildDuration.html.twig',
            array(
                'builds' => $this->get('dashboardhub_app_main.service.travis')
                                 ->getBuildsDurationForGraph($repository, 20)
            )
        );
    }
}
