<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Menu;

use Knp\Menu\FactoryInterface;
use Knp\Menu\ItemInterface;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\SecurityContext;
use HWI\Bundle\OAuthBundle\Security\Core\User\OAuthUser as User;

class MenuBuilderSpec extends ObjectBehavior
{

    function it_is_initializable(FactoryInterface $factory, SecurityContext $securityContext)
    {
        $this->beConstructedWith($factory, $securityContext);
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Menu\MenuBuilder');
    }

    function it_builds_the_menu_when_not_logged_in(FactoryInterface $factory, ItemInterface $menu, Request $request, SecurityContext $securityContext)
    {
        $menu->setChildrenAttributes(array('class' => 'navbar-nav nav'))
             ->shouldBeCalled()
             ->willReturn($menu);
        $menu->addChild('Home', array('route' => 'dashboardhub_app_homepage'))
             ->shouldBeCalled()
             ->willReturn($menu);
        $securityContext
            ->isGranted('IS_AUTHENTICATED_FULLY')
            ->shouldBeCalled()
            ->willReturn(false);
        $menu->addChild('Login', array('route' => 'login'))
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
        $menu->addChild('Home', array('route' => 'dashboardhub_app_homepage'))
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
            ->getUsername()
            ->shouldBeCalled()
            ->willReturn($email);
        $token
            ->getUser()
            ->shouldBeCalled()
            ->willReturn($user);
        $menu->addChild('Dashboard', array('route' => 'dashboardhub_app_dashboard.list'))
             ->shouldBeCalled()
             ->willReturn($menu);
        $menu->addChild('Logout ' . $email, array('route' => 'logout'))
             ->shouldBeCalled()
             ->willReturn($menu);
        $factory->createItem('root')
                ->shouldBeCalled()
                ->willReturn($menu);
        $this->beConstructedWith($factory, $securityContext);
        $this->createMainMenu($request)->shouldHaveType('\Knp\Menu\ItemInterface');
    }
}
