<?php

namespace DashboardHub\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class TravisController
 * @package DashboardHub\Bundle\AppBundle\Controller
 */
class YSlowController extends Controller
{
    /**
     * @param string $uid
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function buildsAction($uid)
    {
        return $this->render(
            'DashboardHubAppBundle:YSlow:latestBuild.html.twig',
            array(
                'build' => $this->get('dashboardhub_app_main.service.yslow')
                                ->getLatestBuild($uid)
            )
        );
    }
}
