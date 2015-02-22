<?php

namespace Quickstart\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\HttpFoundation\Request;

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

    public function __construct(EngineInterface $templating)
    {
        $this->templating = $templating;
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction($reponame)
    {
        $travis = new \GuzzleHttp\Client();
        $builds = $travis->get('https://api.travis-ci.org/repos/' . $reponame . '/builds');

        return $this->templating->renderResponse(
            'QuickstartAppBundle:Travis:index.html.twig',
            array(
                'builds' => array_slice(json_decode($builds->getBody()->getContents(), true), 0, 5)
            )
        );
    }
}
