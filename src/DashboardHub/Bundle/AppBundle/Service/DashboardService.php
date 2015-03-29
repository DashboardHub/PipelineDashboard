<?php
namespace DashboardHub\Bundle\AppBundle\Service;

use DashboardHub\Bundle\AppBundle\Entity\Dashboard;
use DashboardHub\Bundle\AppBundle\Entity\Search;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Security\Core\SecurityContext;
use Tedivm\StashBundle\Service\CacheService as Cache;

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
     * @var Cache
     */
    protected $cache;

    /**
     * @var Cache
     */
    protected $config;

    /**
     * @param EntityManager   $em
     * @param SecurityContext $securityContext
     */
    public function __construct(EntityManager $em, SecurityContext $securityContext, Cache $cache, array $config)
    {
        $this->em              = $em;
        $this->securityContext = $securityContext;
        $this->cache           = $cache;
        $this->config          = $config;
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
            throw new \InvalidArgumentException('Invalid Dashboard ID');
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
            throw new \InvalidArgumentException('Invalid Dashboard ID');
        }

        return $dashboard;
    }

    /**
     * @param string $uid
     *
     * @return array
     */
    public function findOneByUidAndIsPublic($uid)
    {
        $dashboard = $this->em
            ->getRepository('DashboardHubAppBundle:Dashboard')
            ->findOneByUidAndOwnedByUsernameOrIsPublic($uid);

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

    /**
     * @return array
     */
    public function findAllByIsPublicAndLatest()
    {
        return $this->em
            ->getRepository('DashboardHubAppBundle:Dashboard')
            ->findAllByIsPublicAndLatest();
    }

    /**
     * @return array
     */
    public function findAllByIsPublicAndPopular()
    {
        return $this->em
            ->getRepository('DashboardHubAppBundle:Dashboard')
            ->findAllByIsPublicAndPopular();
    }

    /**
     * @param Search $search
     *
     * @return array
     */
    public function search(Search $search)
    {
        return $this->em
            ->getRepository('DashboardHubAppBundle:Dashboard')
            ->search($search);
    }

    /**
     * @param string $uid
     *
     * @return string
     */
    public function getBadge($uid)
    {
        $config = array_flip($this->config);
        /** @var Dashboard $badge */
        $dashboard = $this->findOneByUidAndIsPublic($uid);

        $cache = $this->cache->getItem(__METHOD__, $config[$dashboard->getTheme()]);
        $badge = $cache->get();
        if ($cache->isMiss()) {
            $badge = file_get_contents('https://img.shields.io/badge/DashboardHub-' .
                $config[$dashboard->getTheme()] .
                '-green.svg');

            $cache->set($badge, 60 * 60 * 24);
        }

        return $badge;
    }
}
