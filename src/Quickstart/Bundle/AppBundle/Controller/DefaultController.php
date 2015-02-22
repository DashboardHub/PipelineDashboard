<?php

namespace Quickstart\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;

/**
 * Class DefaultController
 * @package Quickstart\Bundle\AppBundle\Controller
 */
class DefaultController
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
    public function indexAction()
    {
        return $this->templating->renderResponse('QuickstartAppBundle:Default:index.html.twig');
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function changelogAction()
    {
        return $this->templating->renderResponse(
            'QuickstartAppBundle:Default:changelog.html.twig',
            array(
                'changelog' => file('../changelog')
            )
        );
    }
}
