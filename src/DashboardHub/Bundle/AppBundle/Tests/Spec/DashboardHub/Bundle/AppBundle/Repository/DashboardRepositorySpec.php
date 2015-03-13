<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Repository;

use Doctrine\ORM\AbstractQuery;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\ORM\Query;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\Security\Core\SecurityContext;

class DashboardRepositorySpec extends ObjectBehavior
{

    function it_is_initializable(EntityManager $em, ClassMetadata $classMetadata)
    {
        $this->beConstructedWith($em, $classMetadata);

        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Repository\DashboardRepository');
    }

    function it_should_find_all_by_user_and_defaults(
        EntityManager $em,
        ClassMetadata $classMetadata,
        AbstractQuery $abstractQuery
    )
    {
        $username = 'testuser';

        $abstractQuery->setParameter('username', $username)
                      ->shouldBeCalled()
                      ->willReturn($abstractQuery);
        $abstractQuery->setParameter('defaultUsername', 'DashboardHub')
                      ->shouldBeCalled()
                      ->willReturn($abstractQuery);

        $em->createQuery(
            'SELECT d FROM DashboardHubAppBundle:Dashboard d
                          JOIN d.user u
                          WHERE
                            u.username = :username
                            OR
                            u.username = :defaultUsername'
        )
           ->shouldBeCalled()
           ->willReturn($abstractQuery);

        $abstractQuery->getResult()
                      ->shouldBeCalled()
                      ->willReturn(array());

        $this->beConstructedWith($em, $classMetadata);

        $this->findAllByUserAndDefaults($username);
    }

    function it_should_find_one_by_username_and_uid(
        EntityManager $em,
        ClassMetadata $classMetadata,
        AbstractQuery $abstractQuery
    )
    {
        $uid      = 1;
        $username = 'testuser';

        $abstractQuery->setParameter('username', $username)
                      ->shouldBeCalled()
                      ->willReturn($abstractQuery);
        $abstractQuery->setParameter('uid', $uid)
                      ->shouldBeCalled()
                      ->willReturn($abstractQuery);

        $em->createQuery(
            'SELECT d FROM DashboardHubAppBundle:Dashboard d
                          JOIN d.user u
                          WHERE
                            u.username = :username
                            AND
                            d.uid = :uid'
        )
           ->shouldBeCalled()
           ->willReturn($abstractQuery);

        $abstractQuery->getOneOrNullResult()
                      ->shouldBeCalled()
                      ->willReturn(array());

        $this->beConstructedWith($em, $classMetadata);

        $this->findOneByUsernameAndUid($username, $uid);
    }

    function it_should_find_one_by_uid_and_owned_by_username_or_is_public(
        EntityManager $em,
        ClassMetadata $classMetadata,
        AbstractQuery $abstractQuery
    )
    {
        $uid      = 1;
        $username = 'testuser';

        $abstractQuery->setParameter('username', $username)
                      ->shouldBeCalled()
                      ->willReturn($abstractQuery);
        $abstractQuery->setParameter('uid', $uid)
                      ->shouldBeCalled()
                      ->willReturn($abstractQuery);

        $em->createQuery(
            'SELECT d FROM DashboardHubAppBundle:Dashboard d
                          JOIN d.user u
                          WHERE
                            d.uid = :uid
                            AND
                            (
                              d.public = 1
                              OR
                              u.username = :username
                            )'
        )
           ->shouldBeCalled()
           ->willReturn($abstractQuery);

        $abstractQuery->getOneOrNullResult()
                      ->shouldBeCalled()
                      ->willReturn(array());

        $this->beConstructedWith($em, $classMetadata);

        $this->findOneByUidAndOwnedByUsernameOrIsPublic($uid, $username);
    }
}
