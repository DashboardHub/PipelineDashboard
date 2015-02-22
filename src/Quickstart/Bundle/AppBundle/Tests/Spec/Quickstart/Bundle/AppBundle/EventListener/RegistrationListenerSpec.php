<?php

namespace Spec\Quickstart\Bundle\AppBundle\EventListener;

use FOS\UserBundle\Event\FormEvent;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use FOS\UserBundle\Event\UserEvent;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Quickstart\Bundle\AppBundle\Service\RandomUsernameGenerator;
use Quickstart\Bundle\AppBundle\Entity\User;

class RegistrationListenerSpec extends ObjectBehavior
{

    function let(UrlGeneratorInterface $router, RandomUsernameGenerator $generator)
    {
        $this->beConstructedWith($router, $generator);
    }
    
    function it_is_initializable()
    {
        $this->shouldHaveType('Quickstart\Bundle\AppBundle\EventListener\RegistrationListener');
    }

    function it_gets_subsribed_events()
    {
        $this->getSubscribedEvents()
            ->shouldBeArray();
    }

    function its_on_registration_init(
        UserEvent $userEvent,
        User $user,
        UrlGeneratorInterface $router,
        RandomUsernameGenerator $generator
    )
    {
        $generator
            ->getUsername()
            ->shouldBeCalled()
            ->willReturn('12345');

        $this->beConstructedWith($router, $generator);

        $user
            ->setUsername('12345')
            ->shouldBeCalled();

        $userEvent
            ->getUser()
            ->shouldBeCalled()
            ->willReturn($user);

        $this->onRegistrationInit($userEvent);
    }

    function its_on_registration_success(
        FormEvent $event,
        UrlGeneratorInterface $router,
        RandomUsernameGenerator $generator
    )
    {
        $router
            ->generate('quickstart_app_account')
            ->shouldBeCalled()
            ->willReturn('/en/account');

        $this->beConstructedWith($router, $generator);

        $event
            ->setResponse(
                Argument::type('Symfony\Component\HttpFoundation\RedirectResponse')
            )
            ->shouldBeCalled();

        $this->onRegistrationSuccess($event);
    }
}
