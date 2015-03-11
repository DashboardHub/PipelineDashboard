<?php

namespace DashboardHub\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Class DefaultController
 * @package DashboardHub\Bundle\AppBundle\Controller
 */
class MockController extends Controller
{
    public function loginAction()
    {
        return $this->render('DashboardHubAppBundle:Mock:login.html.twig');
    }
}
