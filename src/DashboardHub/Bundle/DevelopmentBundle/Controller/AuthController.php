<?php

namespace DashboardHub\Bundle\DevelopmentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class AuthController
 * @package DashboardHub\Bundle\DevelopmentBundle\Controller
 */
class AuthController extends Controller
{
    public function loginAction(Request $request)
    {
        $request->getSession()->getFlashBag()->add(
            'notice',
            'You have been given a fake identity.'
        );
        
        return $this->redirect('/');
    }
}
