<?php

namespace DashboardHub\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class GithubController
 * @package DashboardHub\Bundle\AppBundle\Controller
 */
class GithubController extends Controller
{
    /**
     * @param string $repository
     * @param int    $limit
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function eventsAction($repository, $limit = 5)
    {
        return $this->render(
            'DashboardHubAppBundle:Github:events.html.twig',
            array(
                'events' => $this->get('dashboardhub_app_main.service.github')
                                 ->getEvents($repository, $limit)
            )
        );
    }

    /**
     * @param string $repository
     * @param int    $limit
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function issuesAction($repository, $limit = 5)
    {
        return $this->render(
            'DashboardHubAppBundle:Github:issues.html.twig',
            array(
                'issues' => $this->get('dashboardhub_app_main.service.github')
                                 ->getIssues($repository, $limit),
            )
        );
    }

    /**
     * @param string $repository
     * @param int    $limit
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function pullrequestsAction($repository, $limit = 5)
    {
        return $this->render(
            'DashboardHubAppBundle:Github:pullrequests.html.twig',
            array(
                'pullrequests' => $this->get('dashboardhub_app_main.service.github')
                                 ->getPullRequests($repository, $limit),
            )
        );
    }
}
