<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Listener;

use DashboardHub\Bundle\AppBundle\Entity\AuthenticationAudit;
use DashboardHub\Bundle\AppBundle\Entity\User;
use DashboardHub\Bundle\AppBundle\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Query;
use Prophecy\Argument;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\SecurityContext;
use PhpSpec\ObjectBehavior;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class AuthenticationListenerSpec extends ObjectBehavior
{

    function it_is_initializable(EntityManager $em, SecurityContext $securityContext)
    {
        $this->beConstructedWith($em, $securityContext);

        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Listener\AuthenticationListener');
    }

    function it_should_on_security_interactive_login(
        InteractiveLoginEvent $event,
        EntityManager $em,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user,
        UserRepository $userRepository
    )
    {
        $username = 'testuser';

        $user->getUsername()
             ->shouldBeCalled()
             ->willReturn($username);

        $token->getUser()
              ->shouldBeCalled()
              ->willReturn($user);

        $securityContext->getToken()
                        ->shouldBeCalled()
                        ->willReturn($token);

        $userRepository->findOneByUsername($username)
                       ->shouldBeCalled()
                       ->willReturn($user);

        $em->getRepository('DashboardHubAppBundle:User')
           ->shouldBeCalled()
           ->willReturn($userRepository);

        $em->persist($user)
           ->shouldBeCalled();

        $em->persist(Argument::type('DashboardHub\Bundle\AppBundle\Entity\AuthenticationAudit'))
           ->shouldBeCalled();

        $em->flush()
           ->shouldBeCalled();

        $this->beConstructedWith($em, $securityContext);

        $this->onSecurityInteractiveLogin($event);
    }

    function it_should_on_security_interactive_login_new_user(
        InteractiveLoginEvent $event,
        EntityManager $em,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user,
        UserRepository $userRepository
    )
    {
        $username = 'testuser';

        $user->getUsername()
             ->shouldBeCalled()
             ->willReturn($username);

        $token->getUser()
              ->shouldBeCalled()
              ->willReturn($user);

        $securityContext->getToken()
                        ->shouldBeCalled()
                        ->willReturn($token);

        $userRepository->findOneByUsername($username)
                       ->shouldBeCalled()
                       ->willReturn(null);

        $em->getRepository('DashboardHubAppBundle:User')
           ->shouldBeCalled()
           ->willReturn($userRepository);

        $em->persist(Argument::type('DashboardHub\Bundle\AppBundle\Entity\User'))
           ->shouldBeCalled();

        $em->persist(Argument::type('DashboardHub\Bundle\AppBundle\Entity\AuthenticationAudit'))
           ->shouldBeCalled();

        $em->flush()
           ->shouldBeCalled();

        $this->beConstructedWith($em, $securityContext);

        $this->onSecurityInteractiveLogin($event);
    }
}
