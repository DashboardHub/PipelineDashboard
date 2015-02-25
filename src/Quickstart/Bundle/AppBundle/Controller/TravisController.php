<?php

namespace Quickstart\Bundle\AppBundle\Controller;

use Quickstart\Bundle\AppBundle\Service\Travis;
use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;

/**
 * Class TravisController
 * @package Quickstart\Bundle\AppBundle\Controller
 */
class TravisController
{

    /**
     * @var EngineInterface
     */
    private $templating;

    /**
     * @var Cache
     */
    private $travis;

    public function __construct(EngineInterface $templating, Travis $travis)
    {
        $this->templating = $templating;
        $this->travis      = $travis;
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction($reponame)
    {
        return $this->templating->renderResponse(
            'QuickstartAppBundle:Travis:index.html.twig',
            array(
                'builds' => array_slice($this->travis->getBuilds($reponame), 0, 5)
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function durationGraphAction($reponame)
    {
        $builds = $this->travis->getBuilds($reponame);

        $graph = array();
        foreach ($builds as $build) {
            $graph['x'][] = (int) $build['number'];
            $graph['y'][] = $build['duration'];
        }

        return $this->templating->renderResponse(
            'QuickstartAppBundle:Travis:durationgraph.html.twig',
            array(
                'builds' => $builds,
                'graph'  => array(
                    'x' => json_encode($graph['x']),
                    'y' => json_encode($graph['y'])
                )
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function latestBuildDurationBoxAction($reponame)
    {
        return $this->templating->renderResponse(
            'QuickstartAppBundle:Travis:latestbuilddurationbox.html.twig',
            array(
                'build' => $this->travis->getBuilds($reponame)[0]
            )
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function latestBuildStatusBoxAction($reponame)
    {
        return $this->templating->renderResponse(
            'QuickstartAppBundle:Travis:latestbuildstatusbox.html.twig',
            array(
                'build' => $this->travis->getBuilds($reponame)[0]
            )
        );
    }
}
