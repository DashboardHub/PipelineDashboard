<?php

namespace DashboardHub\Bundle\DevelopmentBundle\Security\User;

use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use HWI\Bundle\OAuthBundle\Security\Core\User\OAuthAwareUserProviderInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use DashboardHub\Bundle\DevelopmentBundle\Entity\MockUser;

/**
 * Class MockUserProvider
 * @package DashboardHub\Bundle\DevelopmentBundle\Security\User
 */
class MockUserProvider implements UserProviderInterface, OAuthAwareUserProviderInterface
{

    /**
     * @param string $username
     *
     * @return MockUser
     */
    public function loadUserByUsername($username)
    {
        return new MockUser('MockUser');
    }

    /**
     * @param UserInterface $user
     *
     * @return MockUser
     */
    public function refreshUser(UserInterface $user)
    {
        if (!$user instanceof MockUser) {
            throw new UnsupportedUserException(
                sprintf('Instances of "%s" are not supported.', get_class($user))
            );
        }

        return $this->loadUserByUsername($user->getUsername());
    }

    /**
     * @param string $class
     *
     * @return bool
     */
    public function supportsClass($class)
    {
        return $class === 'DashboardHub\Bundle\DevelopmentBundle\Entity\MockUser';
    }

    /**
     * @param UserResponseInterface $response
     *
     * @return MockUser
     */
    public function loadUserByOAuthUserResponse(UserResponseInterface $response)
    {
        return new MockUser('MockUser');
    }
}
