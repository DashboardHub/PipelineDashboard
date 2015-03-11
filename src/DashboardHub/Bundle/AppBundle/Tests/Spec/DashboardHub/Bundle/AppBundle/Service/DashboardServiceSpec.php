<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Service;

use DashboardHub\Bundle\AppBundle\Entity\Dashboard;
use DashboardHub\Bundle\AppBundle\Entity\User;
use DashboardHub\Bundle\AppBundle\Repository\DashboardRepository;
use DashboardHub\Bundle\AppBundle\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\SecurityContext;

class DashboardServiceSpec extends ObjectBehavior
{

    function it_is_initializable(EntityManager $em, SecurityContext $securityContext)
    {
        $this->beConstructedWith($em, $securityContext);
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Service\DashboardService');
    }

    function it_should_find_all_by_authenticated_user_and_defaults(
        EntityManager $em,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user,
        DashboardRepository $dashboardRepository
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

        $dashboardRepository->findAllByUserAndDefaults($username)
            ->shouldBeCalled();

        $em->getRepository('DashboardHubAppBundle:Dashboard')
           ->shouldBeCalled()
            ->willReturn($dashboardRepository);

        $this->beConstructedWith($em, $securityContext);

        $this->findAllByAuthenticatedUserAndDefaults();
    }

    function it_should_find_one_by_id(
        EntityManager $em,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user,
        DashboardRepository $dashboardRepository,
        Dashboard $dashboard
    )
    {
        $id = 1;
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

        $dashboardRepository->findOneByUsernameAndId($username, $id)
            ->shouldBeCalled()
            ->willReturn($dashboard);

        $em->getRepository('DashboardHubAppBundle:Dashboard')
           ->shouldBeCalled()
            ->willReturn($dashboardRepository);

        $this->beConstructedWith($em, $securityContext);

        $this->findOneById($id);
    }

    function it_should_find_one_by_id_throws_exception(
        EntityManager $em,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user,
        DashboardRepository $dashboardRepository
    )
    {
        $id = 1;
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

        $dashboardRepository->findOneByUsernameAndId($username, $id)
            ->shouldBeCalled()
            ->willReturn(null);

        $em->getRepository('DashboardHubAppBundle:Dashboard')
           ->shouldBeCalled()
            ->willReturn($dashboardRepository);

        $this->beConstructedWith($em, $securityContext);

        $this->shouldThrow('\InvalidArgumentException')->duringFindOneById($id);
    }

    function it_should_save(
        EntityManager $em,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user,
        Dashboard $dashboard,
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

        $dashboard->setUser($user)
            ->shouldBeCalled()
            ->willReturn($dashboard);

        $em->persist($dashboard)
            ->shouldBeCalled();

        $em->flush()
            ->shouldBeCalled();

        $this->beConstructedWith($em, $securityContext);

        $this->save($dashboard);
    }
}
