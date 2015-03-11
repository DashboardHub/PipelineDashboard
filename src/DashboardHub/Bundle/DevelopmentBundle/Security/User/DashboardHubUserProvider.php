<?php 

namespace DashboardHub\Bundle\DevelopmentBundle\Security\User;

use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use DashboardHub\Bundle\AppBundle\Entity\User;

class DashboardHubUserProvider implements UserProviderInterface
{
    public function loadUserByUsername($username)
    {
        return new User('Mockerman');
    }

    public function refreshUser(UserInterface $user)
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(
                sprintf('Instances of "%s" are not supported.', get_class($user))
            );
        }

        return $this->loadUserByUsername($user->getUsername());
    }

    public function supportsClass($class)
    {
        return $class === 'DashboardHub\Bundle\AppBundle\Entity\User';
    }
}