<?php

namespace DashboardHub\Bundle\AppBundle\Controller;

use DashboardHub\Bundle\AppBundle\Entity\Dashboard;
use DashboardHub\Bundle\AppBundle\Entity\User;
use DashboardHub\Bundle\AppBundle\Form\DashboardType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Class DashboardController
 * @package DashboardHub\Bundle\AppBundle\Controller
 */
class DashboardController extends Controller
{

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        return $this->render(
            'DashboardHubAppBundle:Dashboard:index.html.twig',
            array(
                'dashboards' => $this->get('dashboardhub_app_main.service.dashboard')
                                     ->findAllByAuthenticatedUserAndDefaults()
            )
        );
    }

    /**
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function addAction(Request $request)
    {
        $dashboard = new Dashboard();

        $form = $this->createForm('dashboard', $dashboard);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $dashboard = $form->getData();

            $this->get('dashboardhub_app_main.service.dashboard')
                 ->save($dashboard);

            $request->getSession()
                    ->getFlashBag()
                    ->add(
                        'success',
                        'Dashboard created'
                    );

            return $this->redirect($this->generateUrl('dashboardhub_app_dashboard.list'));
        }

        return $this->render(
            'DashboardHubAppBundle:Dashboard:add.html.twig',
            array(
                'form' => $form->createView()
            )
        );
    }

    /**
     * @param Request $request
     * @param string  $uid
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function editAction(Request $request, $uid)
    {
        try {
            $dashboard = $this->get('dashboardhub_app_main.service.dashboard')
                              ->findOneByAuthenticatedUserAndUid($uid);
        } catch (\InvalidArgumentException $e) {
            $request->getSession()
                    ->getFlashBag()
                    ->add(
                        'danger',
                        'Invalid Dashboard'
                    );

            return $this->redirect($this->generateUrl('dashboardhub_app_dashboard.list'));
        }

        $form = $this->createForm('dashboard', $dashboard);

        $form->handleRequest($request);

        if ($form->isValid()) {
            $dashboard = $form->getData();

            $this->get('dashboardhub_app_main.service.dashboard')
                 ->save($dashboard);

            $request->getSession()
                    ->getFlashBag()
                    ->add(
                        'success',
                        'Dashboard updated'
                    );

            return $this->redirect($this->generateUrl('dashboardhub_app_dashboard.list'));
        }

        return $this->render(
            'DashboardHubAppBundle:Dashboard:add.html.twig',
            array(
                'form' => $form->createView()
            )
        );
    }

    /**
     * @param Request $request
     * @param string  $uid
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function viewAction(Request $request, $uid)
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

        try {
            $events = $this->get('dashboardhub_app_main.service.github')
                           ->getEvents($dashboard->getRepository(), 5);
        } catch (\Exception $e) {
            $request->getSession()
                    ->getFlashBag()
                    ->add(
                        'danger',
                        'Invalid Github Project'
                    );

            return $this->redirect($this->generateUrl('dashboardhub_app_dashboard.list'));
        }

        return $this->render(
            'DashboardHubAppBundle:Dashboard:view.html.twig',
            array(
                'dashboard'    => $dashboard,
                'repository'   => $dashboard->getRepository(),
                'events'       => $events,
                'issues'       => $this->get('dashboardhub_app_main.service.github')
                                       ->getIssues($dashboard->getRepository(), 5),
                'pullrequests' => $this->get('dashboardhub_app_main.service.github')
                                       ->getPullRequests($dashboard->getRepository(), 5),
                'builds'       => $this->get('dashboardhub_app_main.service.travis')
                                       ->getBuilds($dashboard->getRepository(), 5)
            )
        );
    }
}
