<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Service;

use DashboardHub\Bundle\AppBundle\Entity\Dashboard;
use DashboardHub\Bundle\AppBundle\Entity\Search;
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

    function it_should_find_one_by_authenticated_user_and_uid(
        EntityManager $em,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user,
        DashboardRepository $dashboardRepository,
        Dashboard $dashboard
    )
    {
        $uid      = 1;
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

        $dashboardRepository->findOneByUsernameAndUid($username, $uid)
                            ->shouldBeCalled()
                            ->willReturn($dashboard);

        $em->getRepository('DashboardHubAppBundle:Dashboard')
           ->shouldBeCalled()
           ->willReturn($dashboardRepository);

        $this->beConstructedWith($em, $securityContext);

        $this->findOneByAuthenticatedUserAndUid($uid);
    }

    function it_should_find_one_by_authenticated_user_and_uid_throws_exception(
        EntityManager $em,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user,
        DashboardRepository $dashboardRepository
    )
    {
        $uid      = 1;
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

        $dashboardRepository->findOneByUsernameAndUid($username, $uid)
                            ->shouldBeCalled()
                            ->willReturn(null);

        $em->getRepository('DashboardHubAppBundle:Dashboard')
           ->shouldBeCalled()
           ->willReturn($dashboardRepository);

        $this->beConstructedWith($em, $securityContext);

        $this->shouldThrow('\InvalidArgumentException')
             ->duringFindOneByAuthenticatedUserAndUid($uid);
    }

    function it_should_find_one_by_uid_and_owned_by_username_or_is_public(
        EntityManager $em,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user,
        DashboardRepository $dashboardRepository,
        Dashboard $dashboard
    )
    {
        $uid      = 1;
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

        $dashboardRepository->findOneByUidAndOwnedByUsernameOrIsPublic($uid, $username)
                            ->shouldBeCalled()
                            ->willReturn($dashboard);

        $em->getRepository('DashboardHubAppBundle:Dashboard')
           ->shouldBeCalled()
           ->willReturn($dashboardRepository);

        $this->beConstructedWith($em, $securityContext);

        $this->findOneByUidAndOwnedByUsernameOrIsPublic($uid);
    }

    function it_should_find_one_by_uid_and_owned_by_username_or_is_public_throws_exception(
        EntityManager $em,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user,
        DashboardRepository $dashboardRepository,
        Dashboard $dashboard
    )
    {
        $uid      = 1;
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

        $dashboardRepository->findOneByUidAndOwnedByUsernameOrIsPublic($uid, $username)
                            ->shouldBeCalled()
                            ->willReturn(null);

        $em->getRepository('DashboardHubAppBundle:Dashboard')
           ->shouldBeCalled()
           ->willReturn($dashboardRepository);

        $this->beConstructedWith($em, $securityContext);

        $this->shouldThrow('\InvalidArgumentException')
             ->duringFindOneByUidAndOwnedByUsernameOrIsPublic($uid);
    }

    function it_should_find_one_by_uid_and_is_public(
        EntityManager $em,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user,
        DashboardRepository $dashboardRepository,
        Dashboard $dashboard
    )
    {
        $uid      = 1;

        $dashboardRepository->findOneByUidAndOwnedByUsernameOrIsPublic($uid)
                            ->shouldBeCalled()
                            ->willReturn($dashboard);

        $em->getRepository('DashboardHubAppBundle:Dashboard')
           ->shouldBeCalled()
           ->willReturn($dashboardRepository);

        $this->beConstructedWith($em, $securityContext);

        $this->findOneByUidAndIsPublic($uid);
    }

    function it_should_find_one_by_uid_and_is_public_throws_exception(
        EntityManager $em,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user,
        DashboardRepository $dashboardRepository,
        Dashboard $dashboard
    )
    {
        $uid      = 1;

        $dashboardRepository->findOneByUidAndOwnedByUsernameOrIsPublic($uid)
                            ->shouldBeCalled()
                            ->willReturn(null);

        $em->getRepository('DashboardHubAppBundle:Dashboard')
           ->shouldBeCalled()
           ->willReturn($dashboardRepository);

        $this->beConstructedWith($em, $securityContext);

        $this->shouldThrow('\InvalidArgumentException')
             ->duringFindOneByUidAndIsPublic($uid);
    }

    function it_should_save_create(
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

        $dashboard->getUid()
                  ->shouldBeCalled()
                  ->willReturn(null);

        $dashboard->setUid(Argument::type('string'))
                  ->shouldBeCalled()
                  ->willReturn($dashboard);

        $em->persist($dashboard)
           ->shouldBeCalled();

        $em->flush()
           ->shouldBeCalled();

        $this->beConstructedWith($em, $securityContext);

        $this->save($dashboard);
    }

    function it_should_save_edit(
        EntityManager $em,
        SecurityContext $securityContext,
        TokenInterface $token,
        User $user,
        Dashboard $dashboard,
        UserRepository $userRepository
    )
    {
        $uid = 'abc';
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

        $dashboard->getUid()
                  ->shouldBeCalled()
                  ->willReturn($uid);

        $em->persist($dashboard)
           ->shouldBeCalled();

        $em->flush()
           ->shouldBeCalled();

        $this->beConstructedWith($em, $securityContext);

        $this->save($dashboard);
    }

    function it_should_find_all_by_is_public_and_latest(
        EntityManager $em,
        SecurityContext $securityContext,
        DashboardRepository $dashboardRepository
    )
    {
        $dashboardRepository->findAllByIsPublicAndLatest()
                            ->shouldBeCalled();

        $em->getRepository('DashboardHubAppBundle:Dashboard')
           ->shouldBeCalled()
           ->willReturn($dashboardRepository);

        $this->beConstructedWith($em, $securityContext);

        $this->findAllByIsPublicAndLatest();
    }

    function it_should_find_all_by_is_public_and_popular(
        EntityManager $em,
        SecurityContext $securityContext,
        DashboardRepository $dashboardRepository
    )
    {
        $dashboardRepository->findAllByIsPublicAndPopular()
                            ->shouldBeCalled();

        $em->getRepository('DashboardHubAppBundle:Dashboard')
           ->shouldBeCalled()
           ->willReturn($dashboardRepository);

        $this->beConstructedWith($em, $securityContext);

        $this->findAllByIsPublicAndPopular();
    }

    function it_should_search(
        EntityManager $em,
        SecurityContext $securityContext,
        DashboardRepository $dashboardRepository,
        Search $search
    )
    {
        $dashboardRepository->search($search)
                            ->shouldBeCalled();

        $em->getRepository('DashboardHubAppBundle:Dashboard')
           ->shouldBeCalled()
           ->willReturn($dashboardRepository);

        $this->beConstructedWith($em, $securityContext);

        $this->search($search);
    }
}
