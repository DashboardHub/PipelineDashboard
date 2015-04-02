<?php

namespace DashboardHub\Bundle\AppBundle\Controller;

use DashboardHub\Bundle\AppBundle\Entity\Dashboard;
use DashboardHub\Bundle\AppBundle\Entity\Search;
use DashboardHub\Bundle\AppBundle\Entity\User;
use DashboardHub\Bundle\AppBundle\Form\DashboardType;
use DashboardHub\Bundle\AppBundle\Form\SearchType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

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
                                     ->findAllByAuthenticatedUserAndDefaults(),
                'themes'     => array_flip($this->container->getParameter('dashboard_hub_app.themes'))
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
            'DashboardHubAppBundle:Dashboard:edit.html.twig',
            array(
                'form'      => $form->createView(),
                'dashboard' => $dashboard,
                'themes'    => array_flip($this->container->getParameter('dashboard_hub_app.themes'))
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
            $dashboard->getTheme(),
            array(
                'dashboard' => $dashboard,
                'themes'    => array_flip($this->container->getParameter('dashboard_hub_app.themes'))
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function searchAction(Request $request)
    {
        $dashboards = array();
        $search     = new Search();

        $form = $this->createForm(new SearchType(), $search);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $search = $form->getData();

            $dashboards = $this->get('dashboardhub_app_main.service.dashboard')
                               ->search($search);
        }

        return $this->render(
            'DashboardHubAppBundle:Dashboard:search.html.twig',
            array(
                'form'       => $form->createView(),
                'dashboards' => $dashboards,
                'themes'     => array_flip($this->container->getParameter('dashboard_hub_app.themes'))
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function badgeAction(Request $request, $uid)
    {
        try {
            $badge = $this->get('dashboardhub_app_main.service.dashboard')
                          ->getBadge($uid);
        } catch (\Exception $e) {
            $request->getSession()
                    ->getFlashBag()
                    ->add(
                        'danger',
                        'Invalid Dashboard'
                    );

            return $this->redirect($this->generateUrl('dashboardhub_app_homepage'));
        }

        return $this->render(
            'DashboardHubAppBundle:Dashboard:badge.html.twig',
            array(
                'badge' => $badge,
            ),
            new Response(
                '',
                200,
                array(
                    'ETag'          => hash('md5', $badge),
                    'Cache-Control' => 'no-cache',
                    'Content-Type'  => 'image/svg+xml; charset=UTF-8'
                )
            )
        );
    }
}
