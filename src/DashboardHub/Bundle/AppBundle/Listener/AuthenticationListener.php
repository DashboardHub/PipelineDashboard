<?php

namespace DashboardHub\Bundle\AppBundle\Listener;

use DashboardHub\Bundle\AppBundle\Entity\AuthenticationAudit;
use DashboardHub\Bundle\AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class AuthenticationListener
{

    /**
     * @var SecurityContext
     */
    private $securityContext;

    /**
     * @var EntityManager
     */
    private $em;

    public function __construct(EntityManager $em, SecurityContext $securityContext)
    {
        $this->securityContext = $securityContext;
        $this->em = $em;
    }

    public function onSecurityInteractiveLogin(InteractiveLoginEvent $event)
    {
        $user = $this->em
            ->getRepository('DashboardHubAppBundle:User')
            ->findOneByUsername(
                $this->securityContext->getToken()->getUser()->getUsername()
            );

        if (is_null($user)) {
            $user = new User($this->securityContext->getToken()->getUser()->getUsername());
        }

        $authenticationAudit = new AuthenticationAudit();
        $authenticationAudit->setUser($user);

        $this->em->persist($authenticationAudit);

        $this->em->persist($user);
        $this->em->flush();
    }
}
