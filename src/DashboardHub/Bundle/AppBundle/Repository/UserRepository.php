<?php
namespace DashboardHub\Bundle\AppBundle\Repository;

use DashboardHub\Bundle\AppBundle\Entity\User;
use Doctrine\ORM\EntityRepository;

/**
 * Class UserRepository
 * @package DashboardHub\Bundle\AppBundle\Repository
 */
class UserRepository extends EntityRepository
{

    /**
     * @param string $username
     *
     * @return User|null
     */
    public function findOneByUsername($username)
    {
        return $this->getEntityManager()
                    ->createQuery(
                        'SELECT u FROM DashboardHubAppBundle:User u
                          WHERE
                            u.username = :username'
                    )
                    ->setParameter('username', $username)
                    ->getOneOrNullResult();
    }
}
