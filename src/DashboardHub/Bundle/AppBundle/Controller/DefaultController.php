<?php

namespace DashboardHub\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class DefaultController
 * @package DashboardHub\Bundle\AppBundle\Controller
 */
class DefaultController extends Controller
{
    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        return $this->render(
            'DashboardHubAppBundle:Default:index.html.twig',
            array(
                'themes'            => array_flip($this->container->getParameter('dashboard_hub_app.themes')),
                'latestDashboards'  => $this->get('dashboardhub_app_main.service.dashboard')
                                            ->findAllByIsPublicAndLatest(),
                'popularDashboards' => $this->get('dashboardhub_app_main.service.dashboard')
                                            ->findAllByIsPublicAndPopular(),
                'statistics'        => $this->get('dashboardhub_app_main.service.statistics')
                                            ->getStatistics(),
            )
        );
    }

    /**
     * Public to view public dashboards
     *
     * @param Request $request
     * @param string  $uid
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function dashboardAction(Request $request, $uid)
    {
        try {
            $dashboard = $this->get('dashboardhub_app_main.service.dashboard')
                              ->findOneByUidAndIsPublic($uid);
        } catch (\InvalidArgumentException $e) {
            $request->getSession()
                    ->getFlashBag()
                    ->add(
                        'danger',
                        'Private or Invalid Dashboard'
                    );

            return $this->redirect($this->generateUrl('dashboardhub_app_homepage'));
        }

        return $this->render(
            $dashboard->getTheme(),
            array(
                'themes'    => array_flip($this->container->getParameter('dashboard_hub_app.themes')),
                'dashboard' => $dashboard
            )
        );
    }
}
