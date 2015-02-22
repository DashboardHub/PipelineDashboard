<?php

namespace Quickstart\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class GithubController
 * @package Quickstart\Bundle\AppBundle\Controller
 */
class GithubController
{

    /**
     * @var EngineInterface
     */
    private $templating;

    public function __construct(EngineInterface $templating)
    {
        $this->templating = $templating;
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function eventsAction($reponame)
    {
        $github = new \GuzzleHttp\Client();
        $events = $github->get('https://api.github.com/repos/' . $reponame . '/events?per_page=5');

        return $this->templating->renderResponse(
            'QuickstartAppBundle:Github:events.html.twig',
            array(
                'events' => json_decode($events->getBody()->getContents(), true)
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function pullrequestsAction($reponame)
    {
        $github       = new \GuzzleHttp\Client();
        $pullrequests = $github->get('https://api.github.com/repos/' . $reponame . '/pulls?per_page=5');

        return $this->templating->renderResponse(
            'QuickstartAppBundle:Github:pullrequests.html.twig',
            array(
                'pullrequests' => json_decode($pullrequests->getBody()->getContents(), true)
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function issuesAction($reponame)
    {
        $github = new \GuzzleHttp\Client();
        $issues = $github->get('https://api.github.com/repos/' . $reponame . '/issues?per_page=5');

        return $this->templating->renderResponse(
            'QuickstartAppBundle:Github:issues.html.twig',
            array(
                'issues' => json_decode($issues->getBody()->getContents(), true)
            )
        );
    }
}
