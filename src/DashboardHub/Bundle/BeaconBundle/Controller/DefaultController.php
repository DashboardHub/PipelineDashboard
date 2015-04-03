<?php

namespace DashboardHub\Bundle\BeaconBundle\Controller;

use DashboardHub\Bundle\BeaconBundle\Entity\Page;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DefaultController extends Controller
{
    public function yslowAction(Request $request, $uid, $build)
    {
        $data = json_decode($request->getContent(), true);

        // find dashboard by token
        $dashboard = $this->getDoctrine()
                          ->getRepository('DashboardHubAppBundle:Dashboard')
                          ->findOneByUid($uid);

        if (!$dashboard) {
            throw new NotFoundHttpException('Invalid Token');
        }

        // save
        $page = new Page();
        $page->setDashboard($dashboard);
        $page->setCreatedOn(new \Datetime());
        $page->setBuild($build);
//        $page->setPageLoadTime($data['lt']);
        $page->setPageSize($data['w']);
        $page->setScore($data['o']);
        $page->setUrl(urldecode($data['u']));
        $page->setRequests($data['r']);
        $page->setRuleset($data['i']);
        $this->getDoctrine()
             ->getManager()
             ->persist($page);
        $this->getDoctrine()
             ->getManager()
             ->flush();

        return $this->render('DashboardHubBeaconBundle:Default:index.html.twig');
    }
}
