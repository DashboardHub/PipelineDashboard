<?php

namespace Quickstart\Bundle\AppBundle\Controller;

use Quickstart\Bundle\AppBundle\Service\Github;
use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;

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

    /**
     * @var Github
     */
    private $github;

    public function __construct(EngineInterface $templating, Github $github)
    {
        $this->templating = $templating;
        $this->github     = $github;
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function eventsAction($reponame)
    {
        return $this->templating->renderResponse(
            'QuickstartAppBundle:Github:events.html.twig',
            array(
                'events' => $this->github->getEvents($reponame)
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function pullrequestsAction($reponame)
    {
        return $this->templating->renderResponse(
            'QuickstartAppBundle:Github:pullrequests.html.twig',
            array(
                'pullrequests' => $this->github->getPullRequests($reponame)
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function issuesAction($reponame)
    {
        return $this->templating->renderResponse(
            'QuickstartAppBundle:Github:issues.html.twig',
            array(
                'issues' => $this->github->getIssues($reponame)
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function prBoxAction($reponame)
    {
        return $this->templating->renderResponse(
            'QuickstartAppBundle:Github:prbox.html.twig',
            array(
                'pullrequests' => $this->github->getPullRequests($reponame, 100)
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function issueBoxAction($reponame)
    {
        return $this->templating->renderResponse(
            'QuickstartAppBundle:Github:issuebox.html.twig',
            array(
                'issues' => $this->github->getIssues($reponame, 100)
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function branchBoxAction($reponame)
    {
        return $this->templating->renderResponse(
            'QuickstartAppBundle:Github:branchbox.html.twig',
            array(
                'branches' => $this->github->getBranches($reponame, 30)
            )
        );
    }
}
