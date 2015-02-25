<?php

namespace Quickstart\Bundle\AppBundle\Controller;

use Quickstart\Bundle\AppBundle\Service\Github;
use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class DashboardController
 * @package Quickstart\Bundle\AppBundle\Controller
 */
class DashboardController
{

    /**
     * @var EngineInterface
     */
    private $templating;

    /**
     * @var Github
     */
    private $github;


    private $session;

    public function __construct(EngineInterface $templating, Github $github, $session)
    {
        $this->templating = $templating;
        $this->github     = $github;
        $this->session     = $session;
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(Request $request)
    {
        $reponame = $request->get('reponame', '');

        try {
            $this->github->getEvents($reponame);
        } catch(\Exception $e) {
            // redirect to form page with flash message
            $this->session
                ->getFlashBag()
                ->add(
                'danger',
                'Project not found. Please try again.'
            );
            return new RedirectResponse('/');
        }

        return $this->templating->renderResponse(
            'QuickstartAppBundle:Dashboard:index.html.twig',
            array(
                'reponame' => $reponame,
                'owner'    => explode('/', $reponame)[0],
                'name'     => explode('/', $reponame)[1]
            )
        );
    }

}
