<?php

namespace Quickstart\Bundle\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;

/**
 * Class AccountController
 * @package Quickstart\Bundle\AppBundle\Controller
 */
class AccountController
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
        return $this->templating->renderResponse('QuickstartAppBundle:Account:index.html.twig',
            array(

            )
        );
    }

}
