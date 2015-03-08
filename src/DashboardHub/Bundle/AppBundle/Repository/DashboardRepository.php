<?php
namespace DashboardHub\Bundle\AppBundle\Repository;

use DashboardHub\Bundle\AppBundle\Entity\User;
use Doctrine\ORM\EntityRepository;

/**
 * Class DashboardRepository
 * @package DashboardHub\Bundle\AppBundle\Repository
 */
class DashboardRepository extends EntityRepository
{

    /**
     * @param string $username
     *
     * @return array
     */
    public function findAllByUserAndDefaults($username)
    {
        return $this->getEntityManager()
                    ->createQuery(
                        'SELECT d FROM DashboardHubAppBundle:Dashboard d
                          JOIN d.user u
                          WHERE
                            u.username = :username
                            OR
                            u.username = :defaultUsername'
                    )
                    ->setParameter('username', $username)
                    ->setParameter('defaultUsername', 'DashboardHub')
                    ->getResult();
    }

    /**
     * @param string $username
     * @param int    $id
     *
     * @return array
     */
    public function findOneByUsernameAndId($username, $id)
    {
        return $this->getEntityManager()
                    ->createQuery(
                        'SELECT d FROM DashboardHubAppBundle:Dashboard d
                          JOIN d.user u
                          WHERE
                            u.username = :username
                            AND
                            d.id = :id'
                    )
                    ->setParameter('username', $username)
                    ->setParameter('id', $id)
                    ->getOneOrNullResult();
    }
}
