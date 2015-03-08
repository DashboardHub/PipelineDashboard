<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Repository;

use Doctrine\ORM\AbstractQuery;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\ORM\Query;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\Security\Core\SecurityContext;

class UserRepositorySpec extends ObjectBehavior
{

    function it_is_initializable(EntityManager $em, ClassMetadata $classMetadata)
    {
        $this->beConstructedWith($em, $classMetadata);

        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Repository\UserRepository');
    }

    function it_should_find_one_by_username(
        EntityManager $em,
        ClassMetadata $classMetadata,
        AbstractQuery $abstractQuery
    )
    {
        $id       = 1;
        $username = 'testuser';

        $abstractQuery->setParameter('username', $username)
                      ->shouldBeCalled()
                      ->willReturn($abstractQuery);

        $em->createQuery(
            'SELECT u FROM DashboardHubAppBundle:User u
                          WHERE
                            u.username = :username'
        )
           ->shouldBeCalled()
           ->willReturn($abstractQuery);

        $abstractQuery->getOneOrNullResult()
                      ->shouldBeCalled()
                      ->willReturn(array());

        $this->beConstructedWith($em, $classMetadata);

        $this->findOneByUsername($username);
    }
}
