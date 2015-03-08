<?php
namespace DashboardHub\Bundle\AppBundle\Service;

use DashboardHub\Bundle\AppBundle\Entity\Dashboard;
use DashboardHub\Bundle\AppBundle\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
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
    private $em;

    /**
     * @var SecurityContext
     */
    private $securityContext;

    /**
     * @param EntityManager $em
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
            ->findAllByUserAndDefaults($this->securityContext->getToken()->getUser()->getUsername());
    }

    /**
     * @param int $id
     *
     * @return array
     */
    public function findOneById($id)
    {
        $dashboard = $this->em
            ->getRepository('DashboardHubAppBundle:Dashboard')
            ->findOneByUsernameAndId(
                $this->securityContext->getToken()->getUser()->getUsername(),
                $id
            );

        if (is_null($dashboard)) {
            throw new \InvalidArgumentException('Invalid Dashboard ID');
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
            new User($this->securityContext->getToken()->getUser()->getUsername())
        );

        $this->em->persist($dashboard);
        $this->em->flush();

        return $dashboard;
    }
}
