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

    function it_should_find_one_by_username_and_id(
        EntityManager $em,
        ClassMetadata $classMetadata,
        AbstractQuery $abstractQuery
    )
    {
        $id = 1;
        $username = 'testuser';

        $abstractQuery->setParameter('username', $username)
                      ->shouldBeCalled()
                      ->willReturn($abstractQuery);
        $abstractQuery->setParameter('id', $id)
                      ->shouldBeCalled()
                      ->willReturn($abstractQuery);

        $em->createQuery(
            'SELECT d FROM DashboardHubAppBundle:Dashboard d
                          JOIN d.user u
                          WHERE
                            u.username = :username
                            AND
                            d.id = :id'
        )
           ->shouldBeCalled()
           ->willReturn($abstractQuery);

        $abstractQuery->getOneOrNullResult()
                      ->shouldBeCalled()
                      ->willReturn(array());

        $this->beConstructedWith($em, $classMetadata);

        $this->findOneByUsernameAndId($username, $id);
    }
}
