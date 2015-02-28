<?php

namespace DashboardHub\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Class DashboardController
 * @package DashboardHub\Bundle\AppBundle\Controller
 */
class DashboardController extends Controller
{
    public function indexAction()
    {
        return $this->render('DashboardHubAppBundle:Dashboard:index.html.twig');
    }
}
