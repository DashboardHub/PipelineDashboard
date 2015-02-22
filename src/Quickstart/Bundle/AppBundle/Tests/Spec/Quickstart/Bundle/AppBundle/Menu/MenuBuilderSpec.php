<?php

namespace Spec\Quickstart\Bundle\AppBundle\Menu;

use Knp\Menu\FactoryInterface;
use Knp\Menu\ItemInterface;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\SecurityContext;
use Quickstart\Bundle\AppBundle\Entity\User;

class MenuBuilderSpec extends ObjectBehavior
{

//    function let(FactoryInterface $factory, ItemInterface $menu)
//    {
//        $factory->createItem('root')->shouldBeCalled()->willReturn($menu);
//        $this->beConstructedWith($factory, true);
//    }

    function it_is_initializable(FactoryInterface $factory, SecurityContext $securityContext)
    {
        $this->beConstructedWith($factory, $securityContext);
        $this->shouldHaveType('Quickstart\Bundle\AppBundle\Menu\MenuBuilder');
    }

    function it_builds_the_menu_when_not_logged_in(FactoryInterface $factory, ItemInterface $menu, Request $request, SecurityContext $securityContext)
    {
        $menu->setChildrenAttributes(array('class' => 'navbar-nav nav'))
            ->shouldBeCalled()
            ->willReturn($menu);

        $menu->addChild('nav.home', array('route' => 'quickstart_app_homepage'))
            ->shouldBeCalled()
            ->willReturn($menu);

        $securityContext
            ->isGranted('IS_AUTHENTICATED_FULLY')
            ->shouldBeCalled()
            ->willReturn(false);

        $menu->addChild('nav.login', array('route' => 'fos_user_security_login'))
            ->shouldBeCalled()
            ->willReturn($menu);

        $menu->addChild('nav.register', array('route' => 'fos_user_registration_register'))
            ->shouldBeCalled()
            ->willReturn($menu);

        $factory->createItem('root')
            ->shouldBeCalled()
            ->willReturn($menu);

        $this->beConstructedWith($factory, $securityContext);

        $this->createMainMenu($request)->shouldHaveType('\Knp\Menu\ItemInterface');
    }

    function it_builds_the_menu_when_logged_in(
        FactoryInterface $factory,
        ItemInterface $menu,
        Request $request,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user
    )
    {
        $menu->setChildrenAttributes(array('class' => 'navbar-nav nav'))
            ->shouldBeCalled()
            ->willReturn($menu);

        $menu->addChild('nav.home', array('route' => 'quickstart_app_homepage'))
            ->shouldBeCalled()
            ->willReturn($menu);

        $securityContext
            ->isGranted('IS_AUTHENTICATED_FULLY')
            ->shouldBeCalled()
            ->willReturn(true);

        $securityContext
            ->getToken()
            ->shouldBeCalled()
            ->willReturn($token);

        $email = 'test@email.com';
        $user
            ->getEmail()
            ->shouldBeCalled()
            ->willReturn($email);

        $token
            ->getUser()
            ->shouldBeCalled()
            ->willReturn($user);

        $menu->addChild($email, array('route' => 'quickstart_app_account'))
            ->shouldBeCalled()
            ->willReturn($menu);

        $menu->addChild('nav.logout', array('route' => 'fos_user_security_logout'))
            ->shouldBeCalled()
            ->willReturn($menu);

        $factory->createItem('root')
            ->shouldBeCalled()
            ->willReturn($menu);

        $this->beConstructedWith($factory, $securityContext);

        $this->createMainMenu($request)->shouldHaveType('\Knp\Menu\ItemInterface');
    }
}
