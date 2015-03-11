<?php

namespace DashboardHub\Bundle\DevelopmentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('DashboardHubDevelopmentBundle:Default:index.html.twig', array('name' => $name));
    }
}
