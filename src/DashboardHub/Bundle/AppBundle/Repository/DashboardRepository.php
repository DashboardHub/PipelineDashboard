<?php
namespace DashboardHub\Bundle\AppBundle\Repository;

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
     * @param string $uid
     *
     * @return array
     */
    public function findOneByUsernameAndUid($username, $uid)
    {
        return $this->getEntityManager()
                    ->createQuery(
                        'SELECT d FROM DashboardHubAppBundle:Dashboard d
                          JOIN d.user u
                          WHERE
                            u.username = :username
                            AND
                            d.uid = :uid'
                    )
                    ->setParameter('username', $username)
                    ->setParameter('uid', $uid)
                    ->getOneOrNullResult();
    }

    /**
     * @param string $uid
     *
     * @return array
     */
    public function findOneByUidAndOwnedByUsernameOrIsPublic($uid, $username = null)
    {
        return $this->getEntityManager()
                    ->createQuery(
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
                    ->setParameter('uid', $uid)
                    ->setParameter('username', $username)
                    ->getOneOrNullResult();
    }
}
