<?php

namespace Quickstart\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
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

    public function __construct(EngineInterface $templating)
    {
        $this->templating = $templating;
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(Request $request)
    {
        $reponame = $request->get('reponame', '');

        return $this->templating->renderResponse('QuickstartAppBundle:Dashboard:index.html.twig',
            array(
                'reponame' => $reponame
            )
        );
    }

}
