<?php
namespace DashboardHub\Bundle\BeaconBundle\Service;

use Doctrine\ORM\EntityManager;
use Symfony\Component\Security\Core\SecurityContext;

/**
 * Class Page
 * @package DashboardHub\Bundle\BeaconBundle\Service
 */
class PageService
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
    public function findAllByAuthenticatedUser()
    {
        return $this->em
            ->getRepository('DashboardHubBeaconBundle:Page')
            ->findAllByUser(
                $this->securityContext
                    ->getToken()
                    ->getUser()
                    ->getUsername()
            );
    }
}
