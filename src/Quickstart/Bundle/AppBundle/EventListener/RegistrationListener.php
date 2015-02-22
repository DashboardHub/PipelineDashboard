<?php

namespace Quickstart\Bundle\AppBundle\EventListener;

use FOS\UserBundle\Event\FormEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use FOS\UserBundle\Event\UserEvent;
use FOS\UserBundle\FOSUserEvents;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Quickstart\Bundle\AppBundle\Service\RandomUsernameGenerator;

/**
 * Class UserRegistrationListener
 *
 * The reason for the Listener https://github.com/FriendsOfSymfony/FOSUserBundle/issues/555#issuecomment-59510228
 *
 * @package Quickstart\Bundle\AppBundle\EventListener
 */
class RegistrationListener implements EventSubscriberInterface
{

    /**
     * @var UrlGeneratorInterface
     */
    private $router;

    /**
     * @var RandomUsernameGenerator
     */
    private $generator;

    /**
     * @param UrlGeneratorInterface $router
     * @param RandomUsernameGenerator $generator
     */
    public function __construct(UrlGeneratorInterface $router, RandomUsernameGenerator $generator)
    {
        $this->router = $router;
        $this->generator = $generator;
    }

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return array(
            FOSUserEvents::REGISTRATION_INITIALIZE => 'onRegistrationInit',
            FOSUserEvents::REGISTRATION_SUCCESS => 'onRegistrationSuccess',
        );
    }

    /**
     * take action when registration is initialized
     * set the username to a unique id
     *
     * @param UserEvent $event
     */
    public function onRegistrationInit(UserEvent $event)
    {
        $user = $event->getUser();
        $user->setUsername(
            $this->generator->getUsername()
        );
    }

    /**
     * @param FormEvent $event
     */
    public function onRegistrationSuccess(FormEvent $event)
    {
        $url = $this->router->generate('quickstart_app_account');

        $event->setResponse(new RedirectResponse($url));
    }
}
