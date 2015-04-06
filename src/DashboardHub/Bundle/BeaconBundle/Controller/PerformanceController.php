<?php

namespace DashboardHub\Bundle\BeaconBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class PerformanceController extends Controller
{
    public function indexAction()
    {
        return $this->render(
            'DashboardHubBeaconBundle:Performance:index.html.twig',
            array(
                'pages' => $this->get('dashboard_hub_performance.service.page')
                                     ->findAllByAuthenticatedUser()
            )
        );
    }
}
