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
        $form      = $this->createForm('dashboard', $dashboard);

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
     * @param         $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function editAction(Request $request, $id)
    {
        try {
            $dashboard = $this->get('dashboardhub_app_main.service.dashboard')
                              ->findOneById($id);
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
                'form' => $form->createView()
            )
        );
    }
}
