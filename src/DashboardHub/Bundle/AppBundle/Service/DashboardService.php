<?php
namespace DashboardHub\Bundle\AppBundle\Service;

use DashboardHub\Bundle\AppBundle\Entity\Dashboard;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Security\Core\SecurityContext;

/**
 * Class Dashboard
 * @package DashboardHub\Bundle\AppBundle\Service
 */
class DashboardService
{
    /**
     * @var EntityManager
     */
    protected $em;

    /**
     * @var SecurityContext
     */
    protected $securityContext;

    /**
     * @param EntityManager   $em
     * @param SecurityContext $securityContext
     */
    public function __construct(EntityManager $em, SecurityContext $securityContext)
    {
        $this->em              = $em;
        $this->securityContext = $securityContext;
    }

    /**
     * @return array
     */
    public function findAllByAuthenticatedUserAndDefaults()
    {
        return $this->em
            ->getRepository('DashboardHubAppBundle:Dashboard')
            ->findAllByUserAndDefaults(
                $this->securityContext
                    ->getToken()
                    ->getUser()
                    ->getUsername()
            );
    }

    /**
     * @param string $uid
     *
     * @return array
     */
    public function findOneByAuthenticatedUserAndUid($uid)
    {
        $dashboard = $this->em
            ->getRepository('DashboardHubAppBundle:Dashboard')
            ->findOneByUsernameAndUid(
                $this->securityContext
                    ->getToken()
                    ->getUser()
                    ->getUsername(),
                $uid
            );

        if (is_null($dashboard)) {
            throw new \InvalidArgumentException('Invalid Dashboard Token');
        }

        return $dashboard;
    }

    /**
     * @param string $uid
     *
     * @return array
     */
    public function findOneByUidAndOwnedByUsernameOrIsPublic($uid)
    {
        $dashboard = $this->em
            ->getRepository('DashboardHubAppBundle:Dashboard')
            ->findOneByUidAndOwnedByUsernameOrIsPublic(
                $uid,
                $this->securityContext
                    ->getToken()
                    ->getUser()
                    ->getUsername()
            );

        if (is_null($dashboard)) {
            throw new \InvalidArgumentException('Invalid Dashboard Token');
        }

        return $dashboard;
    }

    /**
     * @param Dashboard $dashboard
     *
     * @return Dashboard
     */
    public function save(Dashboard $dashboard)
    {
        $dashboard->setUser(
            $this->em
                ->getRepository('DashboardHubAppBundle:User')
                ->findOneByUsername(
                    $this->securityContext
                        ->getToken()
                        ->getUser()
                        ->getUsername()
                )
        );

        if (empty($dashboard->getUid())) {
            $dashboard->setUid(uniqid('', true));
        }

        $this->em->persist($dashboard);
        $this->em->flush();

        return $dashboard;
    }
}
