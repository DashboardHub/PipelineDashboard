<?php
namespace DashboardHub\Bundle\BeaconBundle\Repository;

use DashboardHub\Bundle\AppBundle\Entity\Dashboard;
use DashboardHub\Bundle\AppBundle\Entity\Search;
use Doctrine\ORM\EntityRepository;

/**
 * Class PageRepository
 * @package DashboardHub\Bundle\BeaconBundle\Repository
 */
class PageRepository extends EntityRepository
{

    /**
     * @param string $username
     *
     * @return array
     */
    public function findAllByUser($username)
    {
        return $this->getEntityManager()
                    ->createQuery(
                        'SELECT p FROM DashboardHubBeaconBundle:Page p
                          JOIN p.dashboard d
                          JOIN d.user u
                          WHERE
                            u.username = :username'
                    )
                    ->setParameter('username', $username)
                    ->getResult();
    }
}
